package com.logihub.logihub.repository;

import com.logihub.logihub.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    Optional<ChatRoom> findByRoomId(String roomId);
    Optional<ChatRoom> findByParticipantAAndParticipantB(Long a, Long b);
}
