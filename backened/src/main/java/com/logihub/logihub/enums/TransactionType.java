package com.logihub.logihub.enums;

public enum TransactionType {
    SELF_ADD,

    // When user transfers money to another account/user
    TRANSFER_OUT,

    // When user receives money from another account
    TRANSFER_IN
}
