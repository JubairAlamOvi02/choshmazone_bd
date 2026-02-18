import React, { useState } from 'react';

const ReviewSection = ({ productId }) => {
    const [activeFilter, setActiveFilter] = useState('newest');

    const reviews = [
        { id: 1, user: 'Arif R.', rating: 5, comment: 'Absolutely stunning pair of sunglasses. The clarity of the lenses is incredible, and they feel very high-end.', date: '2 days ago', is_verified: true },
        { id: 2, user: 'Sarah J.', rating: 4, comment: 'Love the design. They fit perfectly on my face. The shipping to Dhaka was very fast.', date: '1 week ago', is_verified: true },
        { id: 3, user: 'Mahmud H.', rating: 5, comment: 'Best quality I have found in BD. Very premium packaging too!', date: '2 weeks ago', is_verified: true },
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
                <div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 uppercase">CLIENT REVIEWS</h2>
                    <p className="text-white/40">Verified testimonials from our premium community.</p>
                </div>

                <div className="flex items-center gap-6">
                    <div className="text-center">
                        <div className="text-4xl font-display font-bold">4.8</div>
                        <div className="text-[10px] text-accent font-bold uppercase tracking-widest">Global Rating</div>
                    </div>
                    <button className="px-8 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-accent hover:text-white transition-all duration-500">
                        Write Review
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {reviews.map((review) => (
                    <div key={review.id} className="glass-dark p-8 rounded-[2rem] border border-white/5 transition-all duration-500 hover:border-white/10 group">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex gap-1 text-yellow-500">
                                {[...Array(review.rating)].map((_, i) => (
                                    <svg key={i} className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                ))}
                            </div>
                            <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest">{review.date}</span>
                        </div>

                        <p className="text-white/60 text-sm leading-relaxed mb-8 italic">"{review.comment}"</p>

                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold">
                                {review.user.charAt(0)}
                            </div>
                            <div>
                                <div className="text-xs font-bold uppercase tracking-widest">{review.user}</div>
                                {review.is_verified && (
                                    <div className="flex items-center gap-1 text-[8px] text-accent font-bold uppercase tracking-[0.1em]">
                                        <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 11.388c1.332-1.332 3.109-1.921 4.723-1.637l.63.11c1.196.208 2.454.067 3.568-.41L11.72 9.2c.48-.205.7-.768.495-1.248-.205-.48-.768-.7-1.248-.495l-.63.268c-.768.328-1.638.423-2.46.28l-.63-.11c-1.311-.231-2.75.247-3.83 1.327l-.46.46a.75.75 0 001.06 1.06l.46-.46z" clipRule="evenodd"></path><path fillRule="evenodd" d="M12.98 2.946c-.466-.465-1.222-.465-1.687 0l-5.657 5.657c-.466.466-.466 1.222 0 1.687l.471.472a1.125 1.125 0 001.59 0l5.657-5.657c.466-.465.466-1.221 0-1.687l-.474-.472z" clipRule="evenodd"></path></svg>
                                        Verified Buyer
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewSection;
