package com.example.friendsComments;

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
    private FriendRipository friendRipository;

    @Autowired
    private  CommentRepository commentRepository;

    @Autowired
    private  SessionRepository sessionRepository;

    @Autowired
    private  UserRepository userRepository;

    @GetMapping(path="/addComment") // Map ONLY POST Requests
    public @ResponseBody String addComment (@RequestParam String key,
                                            @RequestParam String text) {
        JSONObject rep = new JSONObject();

        try {
            Integer idUser = null;
            idUser = sessionRepository.findById(Integer.parseInt(key)).get().getIdUser();

            List<Integer> idFriends = new ArrayList<>();
            Iterable<Friend> friends = friendRipository.findAll();
            for (Friend f : friends) {
                if (f.getIdUser().equals(idUser)) {
                    idFriends.add(f.getIdFriend());
                }
            }

            if (idFriends.isEmpty()){
                rep.put("code", 3);
                rep.put("msg", "miste d'amis vide");
                return rep.toString();
            }
            List<JSONObject> listJson = new ArrayList<>();
            Iterable<Comment> comments = commentRepository.findAll();
            for(Comment c: comments){
                JSONObject jse = new JSONObject();
                if (idFriends.contains(Integer.parseInt(c.getIdUser()))){
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
            rep.put("FriendsComments", listJson);
            rep.put("code", -1);
            return rep.toString();
        } catch (Exception e) {
            rep.put("code", 100000);
            rep.put("msg", "Erreur inatendue");
            return  rep.toString();
        }
    }

}