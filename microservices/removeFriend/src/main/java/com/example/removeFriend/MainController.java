package com.example.removeFriend;

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
    private FriendRipository friendRipository;

    @Autowired
    private SessionRepository sessionRepository;

    @GetMapping(path="/removeFriend") // Map ONLY POST Requests
    public @ResponseBody String removeFriend (@RequestParam String key,
                                              @RequestParam String id_friend) {

        JSONObject rep = new JSONObject();
        Integer idUser = null;
        try {
            Session session = null;
            session = sessionRepository.findById(Integer.parseInt(key)).get();
            idUser = session.getIdUser();
            if (session == null) {
                rep.put("code", 2);
                rep.put("msg", "Erreur, vous n'etes pas connecté");
                return rep.toString();
            }

            // récuperer les clé des amis de idUser
            Iterable<Friend> friends = friendRipository.findAll();
            for (Friend f : friends) {
                System.out.println(f);
                if (f.getIdUser().equals(idUser)) {
                    if (f.getIdFriend().equals(Integer.parseInt(id_friend))){
                        friendRipository.deleteById(f.getId());
                        rep.put("code", -1);
                        return  rep.toString();
                    }
                }
            }
            rep.put("code", 3);
            rep.put("msg", "amis introuvable");
            return rep.toString();
        }catch (Exception e){
            rep.put("code", 1000);
            rep.put("msg", "SQL PROBLEME {listeFriendID}");
            return  rep.toString();
        }
    }

}