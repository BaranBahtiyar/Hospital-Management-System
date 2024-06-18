package com.example.webproje.repos;

import com.example.webproje.entities.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BillRepository extends JpaRepository<Bill, Long> {
    @Query("SELECT a FROM Bill a WHERE a.patient_id = :patientId")
    List<Bill> findByUserId(Long patientId);
}
