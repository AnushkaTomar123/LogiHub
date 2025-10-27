package com.logihub.logihub.repository;

import com.logihub.logihub.entity.CustomerBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerBookingRepository extends JpaRepository<CustomerBooking, Long> {
    List<CustomerBooking> findByCustomerId(Long customerId);
    List<CustomerBooking> findByStatus(String status); // e.g., REQUESTED, ACCEPTED
}
