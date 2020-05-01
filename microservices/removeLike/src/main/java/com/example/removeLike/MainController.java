package com.example.removeLike;

import com.mongodb.DBCollection;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = { "http://localhost:3000"})
@RestController
@RequestMapping(path="/Twitter")
public class MainController {

    @Autowired
    private  CommentRepository commentRepository;

    @GetMapping(path="/removeLike") // Map ONLY POST Requests
    public @ResponseBody String removeLike (@RequestParam String idUser,
                                            @RequestParam String idComment) {
        JSONObject rep = new JSONObject();
        try {
            Comment comment = commentRepository.findById(idComment).get();
            comment.removeLike(idUser);
            commentRepository.save(comment);
            rep.put("code", -1);
            return rep.toString();
        } catch (Exception e) {
            rep.put("code", 5);
            rep.put("msg", "AddReplyERROR");
            return  rep.toString();
        }
    }
}