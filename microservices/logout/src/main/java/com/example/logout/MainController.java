package com.example.logout;

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
    private SessionRepository sessionRepository;

    @GetMapping(path="/logout") // Map ONLY POST Requests
    public @ResponseBody String logout (@RequestParam String key ){
        JSONObject rep = new JSONObject();
        try{
            sessionRepository.deleteById(Integer.parseInt(key));
        }catch (Exception e){
            rep.put("code", 2);
            rep.put("msg", "Erreur vous n'etes pas connecté");
            return  rep.toString();
        }
        rep.put("code", -1);
        return  rep.toString();
    }

}