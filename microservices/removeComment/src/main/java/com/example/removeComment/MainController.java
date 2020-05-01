package com.example.removeComment;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = { "http://localhost:3000"})
@RestController
@RequestMapping(path="/Twitter")
public class MainController {

    @Autowired
    private  CommentRepository commentRepository;

    @Autowired
    private  SessionRepository sessionRepository;

    @GetMapping(path="/removeComment") // Map ONLY POST Requests
    public @ResponseBody String removeComment (@RequestParam String key,
                                            @RequestParam String id) {
        JSONObject rep = new JSONObject();

        try {
            Integer idUser = null;
            idUser = sessionRepository.findById(Integer.parseInt(key)).get().getIdUser();
            Comment comment = null;
            comment = commentRepository.findById(id).get();
            if (comment == null){
                rep.put("msg", "Erreur de lecture de commentaire");
                rep.put("code", 1);
                return rep.toString();
            }
            if (!comment.getIdUser().equals(""+idUser)){
                rep.put("msg", "Vous ne pouvez pas supprimer ce commentaire");
                rep.put("code", 3);
                return rep.toString();
            }

            commentRepository.deleteById(id);
            rep.put("code", -1);
            return rep.toString();

         } catch (Exception e) {
            rep.put("code", 100000);
            rep.put("msg", "Erreur inatendue");
            return  rep.toString();
        }
    }
}