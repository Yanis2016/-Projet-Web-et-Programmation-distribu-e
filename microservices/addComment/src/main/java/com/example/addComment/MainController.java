package com.example.addComment;

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

    @GetMapping(path="/addComment") // Map ONLY POST Requests
    public @ResponseBody String addComment (@RequestParam String key,
                                            @RequestParam String text) {
        JSONObject rep = new JSONObject();
        try {
            Comment comment = new Comment();
            comment.setIdUser("" + sessionRepository.findById(Integer.parseInt(key)).get().getIdUser());
            comment.setNom(userRepository.findById(Integer.parseInt(comment.getIdUser())).get().getNom());
            comment.setPrenom(userRepository.findById(Integer.parseInt(comment.getIdUser())).get().getPrenom());
            comment.setText(text);
            commentRepository.save(comment);
            rep.put("date", comment.getDate());
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