package com.example.webproje.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long patient_id;

    @Column(nullable = false)
    private Long appointment_id;

    @Column(nullable = false)
    private double amount;

    @Column(name = "issue_date_time")
    private String issueDateTime;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public Long getPatient_id() {
        return patient_id;
    }

    public void setPatient_id(Long patient_id) {
        this.patient_id = patient_id;
    }

    public String getIssueDateTime() {
        return issueDateTime;
    }

    public Long getAppointment_id() {
        return appointment_id;
    }

    public void setAppointment_id(Long appointment_id) {
        this.appointment_id = appointment_id;
    }

    public void setIssueDateTime(String issueDateTime) {
        this.issueDateTime = issueDateTime;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public void setAppointment(Appointment appointment) {
    }
}
