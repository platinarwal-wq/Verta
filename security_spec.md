# Security Specification: VERTA Compliance Platform

## 1. Data Invariants
1. **User Profile Invariant**: A user document at `/users/{userId}` can only be read or written by the authenticated user whose `request.auth.uid == userId`, or read/written by a validated administrator (`admin`). No user can alter their own `role` field to escalate privileges.
2. **Directory Companies Invariant**: Documents in `/companies/{companyId}` are publicly readable by all users (transparency in PULL directory), but writes/updates/deletes are strictly restricted to administrators and verified auditor roles.
3. **Verification Documents Invariant**: A document in `/verification_documents/{documentId}` belongs strictly to the provider (`userId == request.auth.uid`). Users can only query (`list`), read (`get`), or mutate (`create`, `update`) documents where `resource.data.userId == request.auth.uid` or `incoming().userId == request.auth.uid`.
4. **Homologation Journey Invariant**: Journey pipeline records in `/journey_items/{itemId}` can only be accessed or modified by the company user who created/owns the record (`companyOwnerId == request.auth.uid`) or by an administrator.
5. **Expert Requests Invariant**: Any visitor or user may create an expert inquiry ticket `/expert_requests/{requestId}` with valid email and bounded string fields, but reading list queries is restricted to the request owner (`userId == request.auth.uid`) or administrators.
6. **Default Deny**: All unmapped collections or paths are blocked unconditionally.

## 2. The "Dirty Dozen" Payloads (Must be rejected with PERMISSION_DENIED)
1. **Unauthenticated User Profile Write**: Anonymous or unauthenticated write to `/users/usr_123`.
2. **Privilege Escalation**: Authenticated user trying to update `/users/{uid}` with `{ "role": "admin" }`.
3. **ID Poisoning Attack**: Document write to `/users/{uid}` where document ID exceeds 128 chars or contains illegal path traversal characters.
4. **Public Directory Tampering**: Regular authenticated provider trying to write or modify a company in `/companies/{companyId}` without admin authorization.
5. **Provider Document Hijacking**: Authenticated user 'attacker_uid' attempting to read or update `/verification_documents/{docId}` belonging to 'victim_uid'.
6. **Orphan Document Creation**: Creating `/verification_documents/{docId}` where `incoming().userId` does not match `request.auth.uid`.
7. **Giant Payload / Denial of Wallet**: Trying to upload a title or description exceeding maximum character length constraints.
8. **Journey Item Interception**: User B attempting to list or fetch supplier journey RFQs belonging to Company A.
9. **Journey Progress Tampering**: Unauthenticated caller modifying supplier progress percent.
10. **Expert Request PII Leak**: Non-admin querying all expert requests submitted across the platform.
11. **Malformed Key Injection**: Attempting to insert arbitrary unwhitelisted keys into strict document schemas.
12. **Catch-all Penetration**: Attempting to write to arbitrary paths like `/secrets/{id}` or `/configs/{id}`.

## 3. Test Runner Design
The rules will be verified against the 12 attack vectors to ensure every malicious payload triggers `PERMISSION_DENIED`.
