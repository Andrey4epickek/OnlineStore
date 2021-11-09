package by.effectivesoft.onlinestore.controller;

import by.effectivesoft.onlinestore.model.dto.ReviewDto;
import by.effectivesoft.onlinestore.model.dto.SubReviewDto;
import by.effectivesoft.onlinestore.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    @PostMapping("/{productId}")
    public ReviewDto createReviewToProduct(@PathVariable("productId") Long productId, @RequestBody ReviewDto reviewDto) {
        return reviewService.createReview(productId, reviewDto);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    @PostMapping("/subreviews/{reviewId}")
    public SubReviewDto createSubReview(@PathVariable("reviewId") Long reviewId, @RequestBody SubReviewDto subReviewDto) {
        return reviewService.createSubReview(reviewId, subReviewDto);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN','USER','ADMIN_READ_ONLY')")
    @GetMapping("/averageScore/{productId}")
    public Double averageScore(@PathVariable("productId") Long productId) {
        return reviewService.getAverageScore(productId);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/{id}")
    public ReviewDto deleteReview(@PathVariable("id") Long id) {
        return reviewService.deleteReview(id);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/subreviews/{subReviewId}")
    public SubReviewDto deleteSubReview(@PathVariable("subReviewId") Long subReviewId) {
        return reviewService.deleteSubReview(subReviewId);
    }
}
