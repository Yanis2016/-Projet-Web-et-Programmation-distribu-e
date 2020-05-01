package com.example.createUser;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = { "http://localhost:3000"})
@RestController
@RequestMapping(path="/Twitter")
public class MainController {
    @Autowired
    private UserRepository userRepository;


    @GetMapping(path="/createUser") // Map ONLY POST Requests
    public @ResponseBody String createUser (@RequestParam String nom,
                                            @RequestParam String prenom,
                                            @RequestParam String login,
                                            @RequestParam String password,
                                            @RequestParam String sex,
                                            @RequestParam String birth_date) {
        JSONObject json = new JSONObject();
        try {
            User n = new User();
            n.setNom(nom);
            n.setPrenom(prenom);
            n.setLogin(login);
            n.setPassword(password);
            n.setSex(sex);
            n.setBirth_date(birth_date);
            userRepository.save(n);
        }catch (Exception e){
            json.put("code", 1);
            return  json.toString();
        }
        json.put("code", -1);
        return  json.toString();
    }

}