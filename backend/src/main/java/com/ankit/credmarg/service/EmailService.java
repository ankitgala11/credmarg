package com.ankit.credmarg.service;

import com.ankit.credmarg.entity.OurUsers;
import com.ankit.credmarg.repository.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private UsersRepo usersRepo;

    @Value("${mail.from}")
    private String from;

    public void sendSimpleMessage(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        emailSender.send(message);
    }

    public void sendEmailToUserById(Integer userId) {
        OurUsers user = usersRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        String subject= "Test Mail";
        String text = "Sending mail to " + user.getName();
        sendSimpleMessage(user.getEmail(), subject, text);
    }
}
