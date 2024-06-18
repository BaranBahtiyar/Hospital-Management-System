package com.example.webproje.service;

import com.example.webproje.entities.Patient;
import com.example.webproje.repos.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    @Autowired
    PatientRepository patientRepository;

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Patient getPatientById(Long id) {
        return patientRepository.findById(id).orElse(null);
    }

    public Patient addPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }

    public Patient updatePatient(Long id, Patient patientDetails) {
        Patient existingPatient = patientRepository.findById(id).orElse(null);
        if (existingPatient != null) {
            existingPatient.setNameSurname(patientDetails.getNameSurname());
            existingPatient.setAge(patientDetails.getAge());
            existingPatient.setGender(patientDetails.getGender());

            return patientRepository.save(existingPatient);
        }
        return null;
    }
}
