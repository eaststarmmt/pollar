package com.ssafy.pollar.model.repository;

import com.ssafy.pollar.domain.entity.Following;
import com.ssafy.pollar.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FollowingRepository extends JpaRepository<Following,Long> {
    // getFollower join query
    Optional<List<Following>> findAllByFollower(User user);
    // getFollowee join query
    Optional<List<Following>> findAllByFollowee(User user);
    Optional<Following> findByFollowerAndAndFollowee(User follower,User followee);
}
