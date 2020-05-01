package com.example.addFriend;

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

    @Autowired
    private FriendRipository friendRipository;

    @GetMapping(path="/addFriend") // Map ONLY POST Requests
    public @ResponseBody String addFriend (@RequestParam String key,
                                            @RequestParam String id_friend) {
        JSONObject rep = new JSONObject();
        Integer idUser = null;
        try {
            Session session = null;
            session = sessionRepository.findById(Integer.parseInt(key)).get();
            idUser = session.getIdUser();
            System.out.println(idUser);
            System.out.println(session);
            if (session == null) {
                rep.put("code", 2);
                rep.put("msg", "Erreur, vous n'etes pas connecté");
                return rep.toString();
            }

            Iterable<Friend> friends = friendRipository.findAll();
            for (Friend f : friends) {
                System.out.println(f);
                if (f.getIdUser() == idUser && f.getIdFriend() == Integer.parseInt(id_friend)) {
                    rep.put("code", 3);
                    rep.put("msg", "Déja amis");
                    return rep.toString();
                }
            }
            Friend f = new Friend();
            f.setIdUser(idUser);
            f.setIdFriend(Integer.parseInt(id_friend));
            friendRipository.save(f);
            rep.put("code", -1);
            return  rep.toString();
        }catch (Exception e){
            rep.put("code", -1);
            rep.put("msg", "Erreur SQL");
            return rep.toString();
        }

    }

}