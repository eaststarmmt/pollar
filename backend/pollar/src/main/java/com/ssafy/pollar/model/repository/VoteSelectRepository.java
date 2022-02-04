package com.ssafy.pollar.model.repository;

import com.ssafy.pollar.domain.entity.VoteSelect;
import lombok.extern.java.Log;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoteSelectRepository extends JpaRepository<VoteSelect, Long> {

}
