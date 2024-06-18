package com.example.webproje.repos;

import com.example.webproje.entities.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    @Query("SELECT a FROM Appointment a WHERE a.doctor_id = :doctorId AND a.appointmentDateTime = :appointmentDateTime")
    List<Appointment> findByDoctorIdAndAppointmentDateTime(Long doctorId, String appointmentDateTime);

    @Query("SELECT a FROM Appointment a WHERE a.patient_id = :userId")
    List<Appointment> findByAppointmentsByUserId(Long userId);

    @Query("SELECT a FROM Appointment a WHERE a.doctor_id = :userId")
    List<Appointment> findByAppointmentsByDoctorId(Long userId);
}
