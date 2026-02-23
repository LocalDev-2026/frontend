// Basic logic to sort listings by a score derived from rating and review count.
// Score = Rating + (log10(Reviews + 1) * 0.5)
// This gives weight to higher ratings but also boosts listings with more reviews.

export const sortListingsByScore = (listings) => {
    return [...listings].sort((a, b) => {
        const scoreA = (a.rating || 0) + (Math.log10((a.reviews || 0) + 1) * 0.5);
        const scoreB = (b.rating || 0) + (Math.log10((b.reviews || 0) + 1) * 0.5);
        return scoreB - scoreA;
    });
};
