package com.example.addLike;

import com.mongodb.DBCollection;
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
    private  CommentRepository commentRepository;

    @GetMapping(path="/addLike") // Map ONLY POST Requests
    public @ResponseBody String addLike (@RequestParam String idUser,
                                            @RequestParam String idComment) {
        JSONObject rep = new JSONObject();
        System.out.println("Salut" );
        try{
            Comment comment = commentRepository.findById(idComment).get();
            comment.addLike(idUser);
            commentRepository.save(comment);
            rep.put("code", -1);
            return rep.toString();
        } catch (Exception e) {
            rep.put("code", 1);
            rep.put("msg", "Erreur de saisie");
            return  rep.toString();
        }
    }

}