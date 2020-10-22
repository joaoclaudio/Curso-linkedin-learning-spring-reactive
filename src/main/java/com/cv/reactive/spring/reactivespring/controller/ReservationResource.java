package com.cv.reactive.spring.reactivespring.controller;

import com.cv.reactive.spring.reactivespring.model.Reservation;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping(ReservationResource.ROOM_V_1_RESERVATION)
@CrossOrigin
public class ReservationResource {

    public static final String ROOM_V_1_RESERVATION = "/room/v1/reservation";

    @GetMapping(path = "/{roomId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<Reservation> getReservationById(@PathVariable String roomId) {

        Reservation reservation = new Reservation();

        //reservationService.getReservation(roomId);

        return Mono.just(reservation);
    }

    @PostMapping(path = "", produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public Mono<Reservation> createReservation(@RequestBody Mono<Reservation> reservation) {
        return reservation;
    }

    @PutMapping(path = "/{roomId}", produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public Mono<Reservation> updatePrice(@PathVariable String roomId,
                                         @RequestBody Mono<Reservation> reservation) {
        return reservation;
    }

    @DeleteMapping(path = "/{roomId}")
    public Mono<Boolean> deleteReservation(@PathVariable String roomId) {
        return Mono.just(true);
    }

}
