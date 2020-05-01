package com.example.userComments;

import com.mongodb.DBCollection;
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

    @GetMapping(path="/userComments") // Map ONLY POST Requests
    public @ResponseBody String userComments (@RequestParam String key) {
        JSONObject rep = new JSONObject();
        try {
            Integer idUser = null;
            idUser = sessionRepository.findById(Integer.parseInt(key)).get().getIdUser();

            List<JSONObject> listJson = new ArrayList<>();
            Iterable<Comment> comments = commentRepository.findAll();
            for(Comment c: comments){
                JSONObject jse = new JSONObject();
                if (idUser.equals(Integer.parseInt(c.getIdUser()))){
                    jse.put("id", c.getId());
                    jse.put("author_id", c.getId());
                    jse.put("nom", c.getId());
                    jse.put("prenom", c.getId());
                    jse.put("date", c.getId());
                    jse.put("comment", c.getId());
                    jse.put("likes", c.getId());
                }
                ArrayList<JSONObject> replyJS = new ArrayList<>();
                for (Comment reply : c.getReply()){
                    JSONObject repjs = new JSONObject();
                    repjs.put("id", reply.getId());
                    repjs.put("author_id", reply.getId());
                    repjs.put("nom", reply.getId());
                    repjs.put("prenom", reply.getId());
                    repjs.put("date", reply.getId());
                    repjs.put("comment", reply.getId());
                    repjs.put("likes", reply.getId());
                    replyJS.add(repjs);
                }
                jse.put("replies", replyJS);
                listJson.add(jse);
            }
            rep.put("Comments", listJson);
            rep.put("code", -1);
            return rep.toString();
        } catch (Exception e) {
            rep.put("code", 100000);
            rep.put("msg", "Erreur inatendue");
            return  rep.toString();
        }
    }

}