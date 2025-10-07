package com.logihub.logihub.repository;

import com.logihub.logihub.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository  extends JpaRepository<Admin, Long> {
}
