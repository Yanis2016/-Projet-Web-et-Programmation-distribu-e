package com.example.login;

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

    @Autowired
    private SessionRepository sessionRepository;

    @GetMapping(path="/login") // Map ONLY POST Requests
    public @ResponseBody String createUser (@RequestParam String login,
                                            @RequestParam String password) {
        JSONObject rep = new JSONObject();
        Iterable<User> users = userRepository.findAll();
        for (User u : users){
            if (u.getLogin().equals(login) && u.getPassword().equals(password)){
                Session s = new Session();
                s.setIdUser(u.getId());
                sessionRepository.save(s);
                rep.put("ID", u.getId());
                rep.put("Login", u.getLogin());
                rep.put("Key", s.getId());
                rep.put("nom", u.getNom());
                rep.put("prenom", u.getPrenom());
                rep.put("Sex", ((u.getSex().equals("1"))? "Homme":"Femme"));
                rep.put("DateNaiss", u.getBirth_date());
                rep.put("Depuis", u.getDate());
                rep.put("code", -1);
                return rep.toString();
            }
        }
        rep.put("code", 2);
        rep.put("msg", "login  ou le mot de passe inconnue");
        return  rep.toString();
    }

}