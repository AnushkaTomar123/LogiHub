package com.logihub.logihub.repository;

import com.logihub.logihub.entity.CustomerBooking;
import com.logihub.logihub.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerBookingRepository extends JpaRepository<CustomerBooking, Long> {
    List<CustomerBooking> findByCustomerId(Long customerId);
    List<CustomerBooking> findByStatus(BookingStatus status); // e.g., REQUESTED,
    List<CustomerBooking> findByPickupAddressContainingIgnoreCase(String pickupAddress);
    List<CustomerBooking> findByDropAddressContainingIgnoreCase(String dropAddress);
    List<CustomerBooking> findByPickupAddressContainingIgnoreCaseAndDropAddressContainingIgnoreCase(String pickupAddress, String dropAddress);
    @Query("SELECT b FROM CustomerBooking b WHERE b.transporterId = :transporterId AND b.status IN (:statuses)")
    List<CustomerBooking> findByTransporterIdAndStatuses(@Param("transporterId") Long transporterId,
                                                         @Param("statuses") List<BookingStatus> statuses);

    List<CustomerBooking> findAllByOrderByIdDesc();
}
