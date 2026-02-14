# 📊 System Architecture Overview

## Before & After Comparison

### BEFORE: Simple Product Upload
```
┌─────────────────────────────────┐
│      User                       │
└──────────────┬──────────────────┘
               │
               ↓
    ┌──────────────────────┐
    │  Upload Form         │
    │  - Title             │
    │  - Category          │
    │  - Image             │
    └──────────┬───────────┘
               │
               ↓
    ┌──────────────────────┐
    │  Product (Database)  │
    │  - title             │
    │  - category          │
    │  - image             │
    │  - createdAt         │
    └──────────┬───────────┘
               │
               ↓
    ┌──────────────────────┐
    │  Product Card        │
    │  - Image             │
    │  - Title             │
    │  - Category          │
    └──────────────────────┘
```

### AFTER: Complete Rental Marketplace
```
┌─────────────────────────────────────────────────────────┐
│                    USER                                 │
│  ┌──────────────────┐  ┌──────────────────┐             │
│  │ Register/Login   │  │ Profile (Bio)    │             │
│  └────────┬─────────┘  └────────┬─────────┘             │
│           │                     │                        │
└───────────┼─────────────────────┼────────────────────────┘
            │ (User._id)          │
            ↓                     ↓
   ┌─────────────────┐   ┌──────────────────────────┐
   │  Upload Form    │   │   User Model (Enhanced)  │
   │  - Title        │   │   - email                │
   │  - Desc         │   │   - firstName            │
   │  - Category     │   │   - profileDescription  │
   │  - City         │   │   - city                 │
   │  - MaxDuration  │   │   - averageRating (**)   │
   │  - Image        │   │   - totalReviews (**)    │
   └────────┬────────┘   └──────────────────────────┘
            │                    ↑
            │                    │ Updated by
            ↓                    │ Review System
   ┌──────────────────────────────────────────┐
   │       Product Model (Enhanced)           │
   │ - title                                  │
   │ - description (NEW)                      │
   │ - category                               │
   │ - city (NEW)                             │
   │ - image/imageUrl                         │
   │ - owner → User._id (NEW)                 │
   │ - available (NEW)                        │
   │ - maxDuration (NEW)                      │
   │ - reviews [] (NEW)                       │
   │   ├─ reviewer → User._id                 │
   │   ├─ rating (1-5)                        │
   │   ├─ comment                             │
   │   └─ createdAt                           │
   └──────────────────────┬───────────────────┘
                          │
            ┌─────────────┴──────────────┐
            │                            │
            ↓                            ↓
   ┌──────────────────────┐   ┌──────────────────────┐
   │   Product Card       │   │  Product Detail Page │
   │  - Image             │   │  - Full Image        │
   │  - Title             │   │  - Full Description  │
   │  - Description       │   │  - Owner Details     │
   │  - Category & City   │   │  - All Reviews       │
   │  - Owner Name        │   │  - Review Form       │
   │  - Owner Bio         │   │  - Star Rating Input │
   │  - Owner Rating ⭐  │   │  - Add to Cart       │
   │  - Product Rating ⭐│   └──────────────────────┘
   │  - Max Duration      │
   │  - Add to Cart btn   │
   └──────────────────────┘

(**) = Auto-calculated from reviews
```

---

## 🔄 Data Flow

### Product Upload Flow
```
Frontend (UploadItem)
   ↓
Fill form with:
  - title, description
  - category, city
  - maxDuration
  - image file
   ↓
POST /api/products/upload
  + Headers: Authorization: Bearer {token}
   ↓
Backend (verifyToken middleware)
  - Extract userId from token
  - Add to req.userId
   ↓
Upload multer middleware
  - Save image to /uploads
  - Get filename
   ↓
Create Product
  - Set owner = req.userId
  - Save to database
   ↓
Populate owner details
   ↓
Response → Frontend
   ↓
Redirect to home
```

### Review Flow
```
Frontend (ProductDetail)
   ↓
ReviewForm Component
   ↓
User selects:
  - Star rating (1-5)
  - Writes comment
   ↓
Submit button clicked
   ↓
POST /api/products/:id/review
  + Headers: Authorization: Bearer {token}
  + Body: { rating, comment }
   ↓
Backend (verifyToken)
  - Extract userId from token
   ↓
Validate rating (1-5)
   ↓
Add review to product.reviews[]
  {
    reviewer: userId,
    rating: number,
    comment: string,
    createdAt: Date
  }
   ↓
Save product
   ↓
Recalculate owner rating:
  - Find all products by owner
  - Unwind reviews
  - Calculate average rating
  - Update User.averageRating
  - Update User.totalReviews
   ↓
Populate review data
   ↓
Response → Frontend
   ↓
Update local state
   ↓
Reviews display auto-updates
```

### Display Flow
```
Frontend (HomePage)
   ↓
useEffect: fetch /api/products
   ↓
Backend returns:
{
  products: [
    {
      _id, title, description, category, city,
      image, imageUrl, available, maxDuration,
      owner: {
        _id, email, firstName, profileDescription,
        averageRating, totalReviews
      },
      reviews: [
        {
          reviewer: { _id, email, firstName },
          rating, comment, createdAt
        }
      ]
    }
  ]
}
   ↓
Frontend renders ProductGrid
   ↓
Each product rendered as ProductCard
   ↓
Card displays:
  - image (with fallback)
  - title & category & city
  - description (line-clamped)
  - owner section:
    - name, bio, star rating, review count
  - product rating from reviews
  - max duration badge
  - Add to Cart button
   ↓
User clicks product
   ↓
Navigate to /product/:id
   ↓
ProductDetail page loads
   ↓
Fetch /api/products/:id (full data)
   ↓
Display:
  - Large image
  - All details
  - Owner box (blue bg)
  - Review form (left side)
  - All reviews (right side)
  - Add to Cart button
```

---

## 🗄️ Database Schema Diagram

```
┌─────────────────────────────────────┐
│          Users Collection           │
├─────────────────────────────────────┤
│ _id: ObjectId                       │
│ email: String (unique)              │
│ password: String (hashed)           │
│ firstName: String                   │
│ lastName: String                    │
│ profileDescription: String          │
│ profileImage: String                │
│ city: String                        │
│ averageRating: Number (calculated)  │
│ totalReviews: Number (calculated)   │
│ createdAt: DateTime                 │
│ updatedAt: DateTime                 │
└────────────────┬────────────────────┘
                 │
                 │ 1:Many
                 │ (owner)
                 │
┌─────────────────────────────────────────┐
│       Products Collection               │
├─────────────────────────────────────────┤
│ _id: ObjectId                           │
│ title: String                           │
│ description: String                     │
│ category: String                        │
│ city: String                            │
│ image: String (filename)                │
│ imageUrl: String (full URL)             │
│ owner: ObjectId → Users._id             │
│ available: Boolean                      │
│ maxDuration: Number (days)              │
│ createdAt: DateTime                     │
│ updatedAt: DateTime                     │
│                                         │
│ reviews: [                              │
│   {                                     │
│     reviewer: ObjectId → Users._id  ──┐ │
│     rating: Number (1-5)               │ │
│     comment: String                    │ │
│     createdAt: DateTime                │ │
│   }                                    │ │
│ ]                                      │ │
└─────────────────────────────────────────┘ │
                                            │
      (references back to Users)            │
```

---

## 🛣️ API Endpoints

```
Authentication (existing)
  POST   /api/auth/register      - Register new user
  POST   /api/auth/login         - Login user → returns token

Products (updated)
  POST   /api/products/upload    - Upload new product (protected)
         Body: { title, description, category, city, maxDuration, image }
         Returns: Product with owner populated

  GET    /api/products           - Get all products
         Query: ?category=X&city=Y
         Returns: Products[] with owner and reviews

  GET    /api/products/:id       - Get single product details
         Returns: Full product with reviews populated

Reviews (NEW)
  POST   /api/products/:id/review - Add review (protected)
         Body: { rating, comment }
         Returns: Updated product with review
```

---

## 🎯 Key Improvements

| Feature | Before | After |
|---------|--------|-------|
| Owner Info | None | Full profile with bio & rating |
| Reviews | None | 5-star rating + comments |
| Product Details | Title only | Title + description + specs |
| Location | None | City field |
| Rental Duration | None | Max duration setting |
| Image Display | Standalone | With preview & fallback |
| User Credibility | None | Average rating + review count |
| Product Rating | None | Calculated from reviews |
| Purchase Intent | Add to Cart | Informed decision with reviews |

---

## 📈 Scalability Considerations

### Current Optimization
- ✅ Database indexes on owner and category
- ✅ Populate only needed fields
- ✅ Reviews embedded (good for <1000 reviews/product)
- ✅ User ratings pre-calculated on each review

### Future Enhancements
- 🔮 Pagination for reviews (if >100)
- 🔮 Caching with Redis
- 🔮 Search with Elasticsearch
- 🔮 Messaging system between users
- 🔮 Rating aggregation job (if > 10k reviews/user)
- 🔮 Image CDN for avatar/product images
- 🔮 Analytics dashboard

---

## 🔐 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT token authentication
- ✅ Token verification on protected routes
- ✅ CORS configured
- ✅ Image upload validation
- ✅ Input sanitization on forms

---

This is now a complete, feature-rich rental/lending marketplace! 🎉
