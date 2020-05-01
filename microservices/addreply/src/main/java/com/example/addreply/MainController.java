package com.example.addreply;

import com.mongodb.DBCollection;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = { "http://localhost:3000"})
@RestController
@RequestMapping(path="/Twitter")
public class MainController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private  CommentRepository commentRepository;

    @Autowired
    private  SessionRepository sessionRepository;

    @GetMapping(path="/addreply") // Map ONLY POST Requests
    public @ResponseBody String addreply (@RequestParam String key,
                                          @RequestParam String text,
                                          @RequestParam String idComment) {
        JSONObject rep = new JSONObject();
        try {
            Comment reply = new Comment();
            reply.setIdUser("" + sessionRepository.findById(Integer.parseInt(key)).get().getIdUser());
            reply.setNom(userRepository.findById(Integer.parseInt(reply.getIdUser())).get().getNom());
            reply.setPrenom(userRepository.findById(Integer.parseInt(reply.getIdUser())).get().getPrenom());
            reply.setText(text);
            Comment comment = commentRepository.findById(idComment).get();
            comment.addReply(reply);
            commentRepository.save(comment);
            rep.put("date", reply.getDate());
            rep.put("idComment", comment.getId());
            rep.put("code", -1);
            return rep.toString();
        } catch (Exception e) {
            rep.put("code", 3);
            rep.put("msg", "Erreur inatendue");
            return  rep.toString();
        }
    }

}