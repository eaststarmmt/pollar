package com.ssafy.pollar.model.repository;

import com.ssafy.pollar.domain.entity.Following;
import com.ssafy.pollar.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FollowingRepository extends JpaRepository<Following,Long> {
    // getFollower join query
    @Query(value="select u from User u join u.follower where u.userId=?1")
    List<Following> getFollower(String userId);

    // getFollowee join query
    @Query(value="select u from User u join u.followee where u.userId=?1")
    List<Following> getFollowee(String userId);

}
