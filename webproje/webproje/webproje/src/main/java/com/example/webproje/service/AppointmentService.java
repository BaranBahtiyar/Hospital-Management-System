package com.example.webproje.service;

import com.example.webproje.entities.Appointment;
import com.example.webproje.entities.Doctor;
import com.example.webproje.entities.Patient;
import com.example.webproje.repos.AppointmentRepository;
import com.example.webproje.repos.DoctorRepository;
import com.example.webproje.repos.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    AppointmentRepository appointmentRepository;

    @Autowired
    DoctorRepository doctorRepository;

    @Autowired
    PatientRepository patientRepository;

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Appointment getAppointmentById(Long id) {
        Appointment appointment = appointmentRepository.findById(id).orElse(null);

        if (appointment == null){
            throw new RuntimeException("Appointment not found.");
        }

        return appointment;
    }

    public List<Appointment> getAppointmentByUserId(Long id) {
        List<Appointment> appointments = appointmentRepository.findByAppointmentsByUserId(id);

        if (appointments.isEmpty()){
            throw new RuntimeException("Appointments not found");
        }

        return appointments;
    }

    public List<Appointment> getAppointmentByDoctorId(Long id) {
        List<Appointment> appointments = appointmentRepository.findByAppointmentsByDoctorId(id);

        if (appointments.isEmpty()){
            throw new RuntimeException("Appointments not found");
        }

        return appointments;
    }

    public Appointment bookAppointment(Appointment appointment) {

        String appointmentDateTime = appointment.getAppointmentDateTime();
        Long doctorId = appointment.getDoctor_id();
        Long patientId = appointment.getPatient_id();

        Doctor doctor = doctorRepository.findById(doctorId).orElse(null);
        if (doctor == null || !isDoctorAvailable(doctorId, appointmentDateTime)) {
            throw new RuntimeException("Doctor is not available at the specified time");
        }

        Patient patient = patientRepository.findById(patientId).orElse(null);
        if (patient == null) {
            throw new RuntimeException("Patient not found");
        }
        return appointmentRepository.save(appointment);
    }

    public boolean isDoctorAvailable(Long doctorId, String dateString) {
      List<Appointment> appointments = appointmentRepository.findByDoctorIdAndAppointmentDateTime(doctorId, dateString);
      return appointments.isEmpty();
    }


    public void cancelAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }
}
