package com.example.webproje.service;

import com.example.webproje.entities.Appointment;
import com.example.webproje.entities.Bill;
import com.example.webproje.repos.AppointmentRepository;
import com.example.webproje.repos.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class BillService {

    @Autowired
    BillRepository billRepository;
    @Autowired
    AppointmentRepository appointmentRepository;
    double price;

    public List<Bill> getAllBills() {
        return billRepository.findAll();
    }

    public Bill getBillById(Long id) {
        Bill bill = billRepository.findById(id).orElse(null);

        if (bill == null){
            throw new RuntimeException("Bill was not found");
        }

        return bill;
    }

    public List<Bill> getBillByUserId(Long id) {
        List<Bill> bill = billRepository.findByUserId(id);

        if (bill == null){
            throw new RuntimeException("Bill was not found");
        }

        return bill;
    }

    public Bill createBill(Bill bill) {
        Appointment appointment = appointmentRepository.findById(bill.getAppointment_id()).orElse(null);
        if (!Objects.equals(appointment.getPatient_id(), bill.getPatient_id())) {
            throw new RuntimeException("Appointment not found");
        }

        return billRepository.save(bill);
    }

    public void deleteBill(Long id) {
        billRepository.deleteById(id);
    }
}
