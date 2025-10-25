//package com.logihub.logihub.service.impl;
//
//import com.logihub.logihub.dto.TripRequestDTO;
//import com.logihub.logihub.dto.TripResponseDTO;
//import com.logihub.logihub.entity.Customer;
//import com.logihub.logihub.entity.Trip;
//import com.logihub.logihub.repository.CustomerRepository;
//import com.logihub.logihub.repository.DriverRepository;
//import com.logihub.logihub.repository.TransporterRepository;
//import com.logihub.logihub.repository.TripRepository;
//import lombok.RequiredArgsConstructor;
//import org.modelmapper.ModelMapper;
//import org.springframework.stereotype.Service;
//
//@Service
//@RequiredArgsConstructor
//public class TripService {
//
//    private final TripRepository tripRepository;
//    private final CustomerRepository customerRepository;
//    private final TransporterRepository transporterRepository;
//    private final DriverRepository driverRepository;
//    private final com.logihub.logihub.service.impl.GeoCodingService geoCodingService;
//    private final com.logihub.logihub.service.impl.DistanceService distanceService;
//    private final ModelMapper modelMapper;
//
//    public TripResponseDTO createTrip(TripRequestDTO dto) {
//        // ✅ Customer check
//        Customer customer = customerRepository.findByEmail(dto.getCustomerEmail())
//                .orElseThrow(() -> new RuntimeException("Customer not found: " + dto.getCustomerEmail()));
//
//        // ✅ Get coordinates
//        double[] fromCoords = geoCodingService.getLatLon(dto.getFromLocation());
//        double[] toCoords = geoCodingService.getLatLon(dto.getToLocation());
//
//        // ✅ Calculate distance
//        double distance = distanceService.getDistanceInKm(fromCoords[0], fromCoords[1],
//                toCoords[0], toCoords[1]);
//
//        // ✅ Map DTO → Entity
//        Trip trip = Trip.builder()
//                .transporter(transporterRepository.findById(dto.getTransporterId())
//                        .orElseThrow(() -> new RuntimeException("Transporter not found")))
//                .driver(driverRepository.findById(dto.getDriverId())
//                        .orElseThrow(() -> new RuntimeException("Driver not found")))
////                .customerEmail(customer.getEmail())
//                .fromLocation(dto.getFromLocation())
//                .toLocation(dto.getToLocation())
//                .distance(distance)
//                .status(Trip.Status.PENDING)
//                .build();
//
//        Trip savedTrip = tripRepository.save(trip);
//
//        // ✅ Map Entity → ResponseDTO
//        return modelMapper.map(savedTrip, TripResponseDTO.class);
//    }
//}
