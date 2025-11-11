package com.logihub.logihub.service.impl;

import com.logihub.logihub.dto.*;
import com.logihub.logihub.entity.Customer;
import com.logihub.logihub.entity.Transporter;
import com.logihub.logihub.entity.Wallet;
import com.logihub.logihub.entity.WalletTransaction;
import com.logihub.logihub.enums.TransactionType;
import com.logihub.logihub.enums.WalletOwnerType;
import com.logihub.logihub.repository.CustomerRepository;
import com.logihub.logihub.repository.TransporterRepository;
import com.logihub.logihub.repository.WalletRepository;
import com.logihub.logihub.repository.WalletTransactionRepository;
import com.logihub.logihub.service.WalletService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WalletServiceImpl implements WalletService {

    private final WalletRepository walletRepository;
    private final WalletTransactionRepository transactionRepository;
    private final CustomerRepository customerRepository;
    private final TransporterRepository transporterRepository;
    private final ModelMapper modelMapper;

    // ✅ Create Wallet (for Customer or Transporter)
    @Override
    public Wallet createWallet(WalletRequestDTO request) {
        Wallet wallet;

        if (request.getOwnerType() == WalletOwnerType.CUSTOMER) {
            wallet = walletRepository.findByCustomer_Id(request.getOwnerId())
                    .orElseGet(() -> {
                        Customer customer = customerRepository.findById(request.getOwnerId())
                                .orElseThrow(() -> new RuntimeException("Customer not found"));
                        return walletRepository.save(Wallet.builder()
                                .customer(customer)
                                .ownerType(WalletOwnerType.CUSTOMER)
                                .balance(0.0)
                                .lastUpdated(LocalDateTime.now())
                                .build());
                    });
        } else {
            wallet = walletRepository.findByTransporter_Id(request.getOwnerId())
                    .orElseGet(() -> {
                        Transporter transporter = transporterRepository.findById(request.getOwnerId())
                                .orElseThrow(() -> new RuntimeException("Transporter not found"));
                        return walletRepository.save(Wallet.builder()
                                .transporter(transporter)
                                .ownerType(WalletOwnerType.TRANSPORTER)
                                .balance(0.0)
                                .lastUpdated(LocalDateTime.now())
                                .build());
                    });
        }

        return wallet;
    }

    // ✅ Add Money
    @Override
    @Transactional
    public Wallet addMoney(AddMoneyRequestDTO request) {
        if (request.getAmount() <= 0)
            throw new RuntimeException("Amount must be greater than zero");

        Wallet wallet = (request.getOwnerType() == WalletOwnerType.CUSTOMER)
                ? walletRepository.findByCustomer_Id(request.getOwnerId())
                .orElseThrow(() -> new RuntimeException("Customer wallet not found"))
                : walletRepository.findByTransporter_Id(request.getOwnerId())
                .orElseThrow(() -> new RuntimeException("Transporter wallet not found"));

        wallet.setBalance(wallet.getBalance() + request.getAmount());
        wallet.setLastUpdated(LocalDateTime.now());
        walletRepository.save(wallet);

        // Record transaction
        WalletTransaction tx = WalletTransaction.builder()
                .walletId(wallet.getId())
                .transactionType(TransactionType.SELF_ADD)
                .amount(request.getAmount())
                .description("Money added to wallet")
                .timestamp(LocalDateTime.now())
                .ownerType(request.getOwnerType())
                .build();
        transactionRepository.save(tx);

        return wallet;
    }

    // ✅ Transfer Money
    @Override
    @Transactional
    public String transferMoney(TransferMoneyRequestDTO request) {
        if (request.getAmount() <= 0)
            throw new RuntimeException("Amount must be greater than zero");

        Wallet sender = (request.getSenderType() == WalletOwnerType.CUSTOMER)
                ? walletRepository.findByCustomer_Id(request.getSenderId())
                .orElseThrow(() -> new RuntimeException("Sender wallet (Customer) not found"))
                : walletRepository.findByTransporter_Id(request.getSenderId())
                .orElseThrow(() -> new RuntimeException("Sender wallet (Transporter) not found"));

        Wallet receiver = (request.getReceiverType() == WalletOwnerType.CUSTOMER)
                ? walletRepository.findByCustomer_Id(request.getReceiverId())
                .orElseThrow(() -> new RuntimeException("Receiver wallet (Customer) not found"))
                : walletRepository.findByTransporter_Id(request.getReceiverId())
                .orElseThrow(() -> new RuntimeException("Receiver wallet (Transporter) not found"));

        if (sender.getBalance() < request.getAmount())
            throw new RuntimeException("Insufficient balance");

        // Update balances
        sender.setBalance(sender.getBalance() - request.getAmount());
        receiver.setBalance(receiver.getBalance() + request.getAmount());
        sender.setLastUpdated(LocalDateTime.now());
        receiver.setLastUpdated(LocalDateTime.now());
        walletRepository.save(sender);
        walletRepository.save(receiver);

        // Record transactions
        transactionRepository.save(WalletTransaction.builder()
                .walletId(sender.getId())
                .transactionType(TransactionType.TRANSFER_OUT)
                .amount(-request.getAmount())
                .description("Transferred to wallet ID: " + receiver.getId())
                .timestamp(LocalDateTime.now())
                .relatedWalletId(receiver.getId())
                .ownerType(request.getSenderType())
                .build());

        transactionRepository.save(WalletTransaction.builder()
                .walletId(receiver.getId())
                .transactionType(TransactionType.TRANSFER_IN)
                .amount(request.getAmount())
                .description("Received from wallet ID: " + sender.getId())
                .timestamp(LocalDateTime.now())
                .relatedWalletId(sender.getId())
                .ownerType(request.getReceiverType())
                .build());

        return "Transferred ₹" + request.getAmount() +
                " from wallet " + sender.getId() + " to wallet " + receiver.getId();
    }

    // ✅ Get Wallet by ID and Owner Type
    @Override
    public Wallet getWallet(Long ownerId, String ownerType) {
        WalletOwnerType type = WalletOwnerType.valueOf(ownerType.toUpperCase());
        return (type == WalletOwnerType.CUSTOMER)
                ? walletRepository.findByCustomer_Id(ownerId)
                .orElseThrow(() -> new RuntimeException("Customer wallet not found"))
                : walletRepository.findByTransporter_Id(ownerId)
                .orElseThrow(() -> new RuntimeException("Transporter wallet not found"));
    }

    // ✅ Get Transaction History
//    @Override
//    public List<WalletTransactionResponseDTO> getTransactionHistory(Long ownerId, String ownerType) {
//        Wallet wallet = getWallet(ownerId, ownerType);
//        return transactionRepository.findByWalletId(wallet.getId())
//                .stream()
//                .map(tx -> modelMapper.map(tx, WalletTransactionResponseDTO.class))
//                .collect(Collectors.toList());
//    }

    @Override
    public List<WalletTransactionResponseDTO> getTransactionHistory(Long walletId) {
        return transactionRepository.findByWalletId(walletId)
                .stream()
                .map(tx -> modelMapper.map(tx, WalletTransactionResponseDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<WalletTransactionResponseDTO> getTransactionsByType(Long walletId, TransactionType transactionType) {
        List<WalletTransaction> transactions = transactionRepository.findByWalletIdAndTransactionType(walletId, transactionType);

        return transactions.stream()
                .map(tx -> modelMapper.map(tx, WalletTransactionResponseDTO.class))
                .collect(Collectors.toList());
    }

}
