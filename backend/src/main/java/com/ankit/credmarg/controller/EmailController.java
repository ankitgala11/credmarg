package com.ankit.credmarg.controller;

import com.ankit.credmarg.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send-mail/{userId}")
    public ResponseEntity<String> sendEmail(@PathVariable Integer userId) {
        emailService.sendEmailToUserById(userId);
        return ResponseEntity.ok("Email Sent!");
    }
}
