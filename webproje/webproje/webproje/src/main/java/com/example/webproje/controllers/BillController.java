package com.example.webproje.controllers;

import com.example.webproje.entities.Bill;
import com.example.webproje.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bills")
public class BillController {

    @Autowired
    private BillService billService;

    @GetMapping("/")
    public List<Bill> getAllBills() {
        return billService.getAllBills();
    }

    @GetMapping("/{id}")
    public Bill getBillById(@PathVariable Long id) {
        return billService.getBillById(id);
    }

    @GetMapping("/user/{id}")
    public List<Bill> getBillByUserId(@PathVariable Long id) {
        return billService.getBillByUserId(id);
    }

    @PostMapping("/")
    public Bill createBill(@RequestBody Bill bill) {
        return billService.createBill(bill);
    }

    @DeleteMapping("/{id}")
    public void deleteBill(@PathVariable Long id) {
        billService.deleteBill(id);
    }

}
