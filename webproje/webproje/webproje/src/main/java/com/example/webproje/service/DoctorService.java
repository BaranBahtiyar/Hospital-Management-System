package com.example.webproje.service;

import com.example.webproje.entities.Doctor;
import com.example.webproje.repos.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    @Autowired
    DoctorRepository doctorRepository;

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id).orElse(null);
    }

    public Doctor addDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }

    public Doctor updateDoctor(Long id, Doctor doctorDetails) {
        Doctor existingDoctor = doctorRepository.findById(id).orElse(null);
        if (existingDoctor != null) {
            existingDoctor.setNameSurname(doctorDetails.getNameSurname());
            existingDoctor.setAge(doctorDetails.getAge());
            existingDoctor.setGender(doctorDetails.getGender());

            return doctorRepository.save(existingDoctor);
        }
        return null;
    }
}
