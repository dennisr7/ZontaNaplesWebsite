---
layout: default
title: API reference
---

# API reference

*Unofficial class project, not the official Zonta Club of Naples website.*

This page describes the external interface of the backend: the HTTP/JSON API it accepts (input) and returns (output). Base URL in development: `http://localhost:3000`.

## Conventions

- **Content type:** requests are JSON (`Content-Type: application/json`) unless marked *multipart*. Responses are JSON unless marked *CSV* or *file*.
- **Authentication:** routes marked 🔒 require `Authorization: Bearer <token>`, where the token comes from `POST /api/auth/login`. Invalid, expired, or unknown-user tokens return `401`. A request to a 🔒 route with **no** `Bearer` header is not answered by the middleware and may hang until the client times out (known issue).
- **Success envelope** (most routes): `{ "success": true, "message"?: string, "count"?: number, "data": ... }`
- **Error envelope:** `{ "success": false, "error": "message" }`. Validation failures add `"errors": [...]` where the controller provides them. Donation routes return `{ "error": "message" }` without `success`. Unknown routes return `404 { "error": "Route not found", "path": "..." }`. Unhandled errors return `{ "error": "..." }` (plus `stack` when `NODE_ENV=development`).
- **IDs** are MongoDB ObjectIds (24-character hex strings).
- **Dates** are ISO 8601 strings.
- **CORS:** browser requests are allowed from `http://localhost:5173` only.

## Utility

| Method | Path | Output |
|--------|------|--------|
| GET | `/` | `{ message, version, endpoints }` |
| GET | `/health` | `{ "status": "OK", "timestamp": "<ISO date>" }` |

## Auth: `/api/auth`

### `POST /api/auth/login`
Input: `{ "email": string, "password": string }`

`200`:
```json
{ "success": true, "message": "Login successful",
  "data": { "token": "<jwt>", "expiresIn": "7d",
    "admin": { "id": "...", "email": "...", "role": "admin", "firstName": "...", "lastName": "..." } } }
```
Errors: `400` missing fields; `401` `Invalid credentials` or `Account is disabled`.

### `POST /api/auth/logout` 🔒
No input. `200 { "success": true, "message": "Logout successful" }`. Tokens are stateless; the client must discard the token.

### `GET /api/auth/test`
Health-style check: `{ success, message, endpoints }`.

## Members: `/api/members`

Member statuses: `pending`, `approved`, `rejected`, `active`.

### `POST /api/members/apply`
Input: `{ "firstName": string, "lastName": string, "email": string, "phone"?: string, "reason": string (≥ 20 chars) }`

`201`: `{ success, message, data: { id, applicantName, applicantEmail, submittedAt } }`. Sends confirmation and admin emails.
Errors: `400` duplicate email (`An application with this email already exists.`) or `Validation Error` with `errors`.

### `GET /api/members` 🔒
Query: `status?` (`pending|approved|rejected|active`). Output: `{ success, count, data: [Member] }`.

### `GET /api/members/:id` 🔒
Output: `{ success, data: Member }`. `404` if not found.

### `PUT /api/members/:id` 🔒
Input: `{ "status"?: string, "notes"?: string }`. Changing status to `approved` creates a Stripe checkout session for the initial dues and emails the applicant the payment link. Output: `{ success, message, data: Member }`.

### `DELETE /api/members/:id` 🔒
Output: `{ success, message }`.

### `GET /api/members/test`
Connectivity check.

## Membership payments: `/api/membership-payments`

| Method | Path | Input | Output |
|--------|------|-------|--------|
| POST | `/checkout` | `{ "memberId": string, "isRenewal"?: boolean }` | `200 { success, sessionId, url }`. `400` if the member is not approved (or, for renewals, not active); `404` unknown member |
| GET | `/session/:sessionId` | | Stripe checkout session details |
| POST | `/trigger-reminders` 🔒 | none | Runs the renewal-reminder check now; `200` with the result |
| POST | `/webhook` | Stripe event (raw body, `stripe-signature` header) | `200 { received: true }`. On `checkout.session.completed`, marks the member active and records payment |

## Events: `/api/events`

Event types: `fundraiser`, `meeting`, `social`, `service`, `other`. Event statuses used by filters: `upcoming`, `past`, `cancelled`.

### `GET /api/events`
Query: `type?`, `status?` (`upcoming|past|cancelled`), `upcoming?=true`. Only active events are returned, sorted by date ascending. Output: `{ success, count, data: [Event] }`.

### `GET /api/events/:id`
Output: `{ success, data: Event }`; `404` if not found.

### `POST /api/events` 🔒 (*multipart* or JSON)
Fields: `title` (required), `description` (required, ≥ 15 chars), `date` (required), `location` (required), `type`, `ticketPrice` (≥ 0), `maxAttendees` (≥ 1), `status`, `image` (file). Output `201 { success, message, data: Event }`; `400 Validation failed` with `errors`.

### `PUT /api/events/:id` 🔒
Same fields, all optional. Output: `{ success, message, data: Event }`.

### `DELETE /api/events/:id` 🔒
Output: `{ success, messsage }` (the key is misspelled `messsage` in the current code).

### `POST /api/events/:id/rsvp`
Input: `{ "email": string }`. Output: `{ success, message: "RSVP successful! Check your email for confirmation.", ... }` and a confirmation email.
Errors (`400`): missing/invalid email, past event, event not accepting RSVPs, already registered, full capacity; `404` event not found.

### `GET /api/events/:id/rsvps` 🔒
Output: `{ success, data: { title, date, location, rsvps: [...] } }`.

## Scholarship applications: `/api/scholarship`

Statuses: `pending`, `under_review`, `approved`, `rejected`.

### `POST /api/scholarship/apply` (*multipart*)
Fields: `firstName`, `lastName`, `email` (required), `phone`, and 1–2 files in field `documents` (PDF/DOC/DOCX, ≤ 5 MB each; at least one is required).

`201`: `{ success, message, data: { id, applicantName, applicantEmail, documentsUploaded, submittedAt } }`. Emails applicant and admin.
Errors: `400` no files, duplicate email, invalid file type/size/count/field name, or `Validation Error`.

### `GET /api/scholarship/download-form`
Returns the application form as a **file** download; `404` if missing.

### Review endpoints
`GET /api/scholarship` (query `status?`; `{ success, count, data }`), `GET /api/scholarship/:id`, `PUT /api/scholarship/:id` (input `{ status?, notes? }`).
⚠️ In the current code these three routes are **not** wrapped in `protect`, although they are intended for admins.

## Scholarship listings: `/api/scholarship-listings`

Listing statuses: `active`, `draft`, `archived`, `expired`.

| Method | Path | Notes |
|--------|------|-------|
| GET | `/` | Query `status?`. `{ success, count, data: [Listing] }` |
| GET | `/:identifier` | Listing by id or slug; `404` if not found |
| POST | `/admin` 🔒 | *multipart*. Fields: `title`, `description` (≤ 2000), `shortDescription` (≤ 300), `amount` (≥ 0), `deadline`, `eligibility` (≤ 1000), `learnMoreUrl`, `status`, `slug`, `isFeatured`, files `image` (**required**) and `attachment`. `201`; `400` for missing image or duplicate slug |
| PUT | `/admin/:id` 🔒 | Same fields, optional |
| DELETE | `/admin/:id` 🔒 | `{ success, message }`; also deletes Cloudinary files |
| GET | `/admin/stats` 🔒 | Aggregate counts (currently shadowed by `/:identifier`; see known issues) |

## Products (shop): `/api/products`

Categories: `Apparel`, `Accessories`, `Books`, `Home & Garden`, `Jewelry`, `Art`, `Other`. Statuses: `active`, `draft`, `archived`.

### Public
| Method | Path | Input | Output |
|--------|------|-------|--------|
| GET | `/` | Query `category?`, `status?`, `search?`, `sortBy?` (default `-createdAt`) | `{ success, count, data: [Product] }` |
| GET | `/categories` | | `{ success, data: [string] }` |
| GET | `/:identifier` | product id or slug | `{ success, data: Product }`; `404` |
| POST | `/checkout` | `{ "productId": string, "quantity"?: number (default 1), "customerEmail": string, "customerName": string }` | `{ success, sessionId, url, orderId }`. Redirect the buyer to `url`. `400` missing fields/unavailable/insufficient stock; `404` |
| GET | `/session/:sessionId` | | `{ success, data: Order }` |
| POST | `/cancel/:orderId` | | `{ success, message: "Order canceled", ... }` |
| POST | `/webhook` | Stripe event (raw body) | `{ received: true }` |

### Admin 🔒
| Method | Path | Notes |
|--------|------|-------|
| POST | `/admin` | *multipart*: `name`, `description` (≤ 500), `shortDescription` (≤ 250), `price`, `inventory`, `trackInventory`, `allowBackorder`, `sku`, `category`, `status`, `weight`, `weightUnit` (`lb|oz|kg|g`), `requiresShipping`, `slug`, file `image`. `201`; `400` for validation or duplicate SKU/slug |
| PUT | `/admin/:id` | Same, optional. `404` if missing |
| DELETE | `/admin/:id` | `{ success, message }` |
| GET | `/admin/stats` | Product statistics |
| GET | `/admin/orders` | Query `status?`, `startDate?`, `endDate?`, `page?=1`, `limit?=50` |
| GET | `/admin/orders/stats` | Order statistics |
| GET | `/admin/orders/export` | **CSV** download (`orders.csv`); same filters |

Order statuses: `pending`, `completed`, `failed`.

## Donations: `/api/donations`

### Public
| Method | Path | Input | Output |
|--------|------|-------|--------|
| POST | `/create-checkout` | `{ "amount": number (≥ 1, USD), "donorName": string, "donorEmail": string, "donorPhone"?: string, "message"?: string, "isRecurring"?: boolean, "frequency"?: "monthly" | "yearly" | "one-time" }` | `{ sessionId, url, donationId }`. Redirect the donor to `url`. `400 { error }` for missing fields or amount < 1 |
| GET | `/session/:sessionId` | | Donation object; `404` |
| POST | `/cancel/:donationId` | | `{ message: "Donation canceled", ... }`; `404` |
| POST | `/webhook` | Stripe event (raw body, `stripe-signature`) | `{ received: true }`; updates donation status |

### Admin 🔒
| Method | Path | Output |
|--------|------|--------|
| GET | `/` | Query `status?`, `startDate?`, `endDate?`, `page?=1`, `limit?=50`. `{ donations, totalPages, currentPage, total, statistics: { totalAmount, totalDonations, averageDonation } }` |
| GET | `/stats` | `{ totalCount, totalAmount, averageAmount, completedCount, last30Days: { totalAmount, count }, statusBreakdown: { completed, pending, failed } }` |
| GET | `/export` | **CSV** download (`donations-<timestamp>.csv`); same filters as list |
| POST | `/cleanup` | Deletes stale pending donations; returns a summary |
| GET | `/:id` | Donation object |

Donation statuses: `pending`, `completed`, `failed`, `refunded`.

## Contact: `/api/contact`

### `POST /api/contact`
Input: `{ "name": string, "email": string, "subject": string, "message": string (≥ 10 chars) }`. Output `200 { success: true, ... }`. `400 All fields are required`; `500` if the notification email fails.

### Admin 🔒
| Method | Path | Input / Output |
|--------|------|----------------|
| GET | `/admin` | Query `status?` (`unread|read|responded`), `limit?=50`, `page?=1` → `{ success, ... }` list with pagination |
| GET | `/admin/:id` | `{ success, data }`; `404` |
| PUT | `/admin/:id` | `{ status?, notes? }` → `{ success, data }` |
| DELETE | `/admin/:id` | `{ success, message: "Contact deleted successfully" }` |

## HTTP status codes

`200`/`201` success · `400` bad input · `401` unauthenticated · `404` not found · `500` server error.

## Known issues

Documented for transparency; please file issues or pull requests.

- `GET/PUT /api/scholarship` review routes lack `protect`.
- `GET /api/scholarship-listings/admin/stats` is declared after `/:identifier`, so it may be matched as an identifier.
- `protect` does not respond when no `Authorization: Bearer` header is sent.
- The `DELETE /api/events/:id` response key is spelled `messsage`.
