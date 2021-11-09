package by.effectivesoft.onlinestore.service;

import by.effectivesoft.onlinestore.dao.ProductDao;
import by.effectivesoft.onlinestore.dao.ReviewDao;
import by.effectivesoft.onlinestore.dao.SubReviewDao;
import by.effectivesoft.onlinestore.exceptions.ServiceException;
import by.effectivesoft.onlinestore.model.Product;
import by.effectivesoft.onlinestore.model.Review;
import by.effectivesoft.onlinestore.model.SubReview;
import by.effectivesoft.onlinestore.model.dto.ReviewDto;
import by.effectivesoft.onlinestore.model.dto.SubReviewDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@Service
@Validated
public class ReviewService {

    private final ProductDao productDao;
    private final ReviewDao reviewDao;
    private final SubReviewDao subReviewDao;
    private final ModelMapper mapper;

    private final static String DEFAULT_MESSAGE = "DELETED";
    private final static Integer DEFAULT_SCORE = 0;

    @Autowired
    public ReviewService(ProductDao productDao, ReviewDao reviewDao, SubReviewDao subReviewDao, ModelMapper mapper) {
        this.productDao = productDao;
        this.reviewDao = reviewDao;
        this.subReviewDao = subReviewDao;
        this.mapper = mapper;
    }

    public ReviewDto createReview(Long productId, @Valid ReviewDto reviewDto) {
        Product product = productDao.findById(productId)
                .orElseThrow(() -> new ServiceException("Product with Id " + productId + " not found"));
        Review review = new Review();
        review.setDescription(reviewDto.getDescription());
        review.setScore(reviewDto.getScore());
        product.getReview().add(review);
        reviewDao.save(review);
        return convertReviewToDto(review);
    }

    public SubReviewDto createSubReview(Long reviewId, @Valid SubReviewDto subReviewDto) {
        Review review = reviewDao.findById(reviewId)
                .orElseThrow(() -> new ServiceException("Review with Id " + reviewId + " not found"));
        SubReview subReview = new SubReview();
        subReview.setDescription(subReviewDto.getDescription());
        review.getSubReviews().add(subReview);
        subReviewDao.save(subReview);
        return convertSubReviewToDto(subReview);
    }

    public Double getAverageScore(Long productId) {
        Product product = productDao.findById(productId)
                .orElseThrow(() -> new ServiceException("Product with Id " + productId + " not found"));
        List<Review> reviews = product.getReview();
        List<Review> reviewsScore = new ArrayList<>();
        for (Review review : reviews) {
            if (!review.getDescription().equals("DELETED")) {
                reviewsScore.add(review);
            }
        }
        Double totalScore = 0D;
        for (Review review : reviewsScore) {
            totalScore += review.getScore();
        }
        Double averageScore = totalScore / reviewsScore.size();
        Double scale = Math.pow(10, 2);
        Double result = Math.ceil(averageScore * scale) / scale;
        return result;
    }

    public ReviewDto deleteReview(Long reviewId) {
        Review review = reviewDao.findById(reviewId)
                .orElseThrow(() -> new ServiceException("Review with Id " + reviewId + " not found"));
        review.setDescription(DEFAULT_MESSAGE);
        review.setScore(DEFAULT_SCORE);
        reviewDao.save(review);
        return convertReviewToDto(review);
    }

    public SubReviewDto deleteSubReview(Long subReviewId) {
        SubReview subReview = subReviewDao.findById(subReviewId)
                .orElseThrow(() -> new ServiceException("SubReview with Id " + subReviewId + " not found"));
        subReview.setDescription(DEFAULT_MESSAGE);
        subReviewDao.save(subReview);
        return convertSubReviewToDto(subReview);
    }

    private ReviewDto convertReviewToDto(Review review) {
        return mapper.map(review, ReviewDto.class);
    }

    private SubReviewDto convertSubReviewToDto(SubReview subReview) {
        return mapper.map(subReview, SubReviewDto.class);
    }
}
