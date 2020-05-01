package com.example.getUserList;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = { "http://localhost:3000"})
@RestController
@RequestMapping(path="/Twitter")
public class MainController {
    @Autowired
    private UserRepository userRepository;


    @GetMapping(path="/getuserslist") // Map ONLY POST Requests
    public @ResponseBody String getuserslist() {
        JSONObject rep = new JSONObject();
        List<JSONObject> usersJsons = new ArrayList<>();
        try {
            Iterable<User> users = userRepository.findAll();
            for (User u : users) {
                JSONObject json = new JSONObject();
                json.put("id", u.getId());
                json.put("nom", u.getNom());
                json.put("prenom", u.getPrenom());
                json.put("login", u.getLogin());
                json.put("DateNaiss", u.getBirth_date());
                json.put("Sex", u.getSex());
                json.put("Depuis", u.getDate());
                usersJsons.add(json);
            }
        }catch (Exception e){
            rep.put("msg", "Erreur de selection d'utilisateurs");
            return  rep.toString();
        }
        rep.put("Users", usersJsons);
        rep.put("code", -1);
        return  rep.toString();
    }

}