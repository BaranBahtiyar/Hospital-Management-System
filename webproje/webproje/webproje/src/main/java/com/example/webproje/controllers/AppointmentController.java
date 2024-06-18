package com.example.webproje.controllers;

import com.example.webproje.entities.Appointment;
import com.example.webproje.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @GetMapping("/")
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    @GetMapping("/{id}")
    public Appointment getAppointmentById(@PathVariable Long id) {
        return appointmentService.getAppointmentById(id);
    }

    @GetMapping("/patient/{userId}")
    public List<Appointment> getAppointmentByUserId(@PathVariable Long userId) {
        return appointmentService.getAppointmentByUserId(userId);
    }

    @GetMapping("/doctor/{userId}")
    public List<Appointment> getAppointmentByDoctorId(@PathVariable Long userId) {
        return appointmentService.getAppointmentByDoctorId(userId);
    }

    @PostMapping("/")
    public Appointment bookAppointment(@RequestBody Appointment appointment) {
        return appointmentService.bookAppointment(appointment);
    }

    @DeleteMapping("/{id}")
    public void cancelAppointment(@PathVariable Long id) {
        appointmentService.cancelAppointment(id);
    }

}
