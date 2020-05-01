package com.example.search;

import com.mongodb.DBCollection;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = { "http://localhost:3000"})
@RestController
@RequestMapping(path="/Twitter")
public class MainController {

    @Autowired
    private  CommentRepository commentRepository;

    @GetMapping(path="/search") // Map ONLY POST Requests
    public @ResponseBody String search (@RequestParam String key,
                                            @RequestParam String word) {
        JSONObject rep = new JSONObject();

        try {
            Iterable<Comment> comments = commentRepository.findAll();
            Map<Integer, Integer> count = new HashMap<>();
            int i = 0;
            for (Comment c: comments){
                count.put(i, c.getText().split(word).length);
            }
            rep.put("comments", comments);
            rep.put("code", -1);
            return rep.toString();
        } catch (Exception e) {
            rep.put("code", 100000);
            rep.put("msg", "Erreur inatendue");
            return  rep.toString();
        }
    }

}