# 🧪 RSC Admin Mission Control - Account Testing Guide

## Overview

The system includes **5 unique admin accounts** with different roles and permission levels. This guide helps developers test and validate that role-based access control (RBAC) is working correctly.

## 📧 Admin Accounts

### 1. Orion Operations (SUPER_ADMIN)
- **Email**: `orion.ops@rsc-chain.com`
- **Password**: `admin123`
- **Role**: SUPER_ADMIN
- **Department**: Executive Operations
- **Permissions**: `*` (All permissions)

**Expected Access**:
- ✅ Full access to all modules
- ✅ Can approve/reject follow bonus requests
- ✅ Can perform bulk operations
- ✅ Can access all user management features
- ✅ Can create and manage events
- ✅ Full audit log access

### 2. Nova Analytics (OPS_LEAD)
- **Email**: `nova.ops@rsc-chain.com`
- **Password**: `nova2024`
- **Role**: OPS_LEAD
- **Department**: Operations Lead
- **Permissions**: `users:read`, `users:write`, `follow_bonus:*`, `events:*`, `audit:read`

**Expected Access**:
- ✅ Full Follow Bonus queue management
- ✅ Full Events management
- ✅ User management (read/write)
- ✅ Audit log access
- ❌ Cannot access super-admin only features

### 3. Centauri Review (ANALYST)
- **Email**: `centauri.ops@rsc-chain.com`
- **Password**: `centauri2024`
- **Role**: ANALYST
- **Department**: Manual Review Team
- **Permissions**: `users:read`, `follow_bonus:read`, `follow_bonus:write`, `events:read`, `audit:read`

**Expected Access**:
- ✅ Can approve/reject follow bonus requests
- ✅ Can view follow bonus queue and stats
- ✅ Read-only access to users
- ✅ Read-only access to events
- ✅ Audit log access
- ❌ Cannot create/modify events
- ❌ Cannot modify user accounts

### 4. Lyra Compliance (AUDITOR)
- **Email**: `lyra.ops@rsc-chain.com`
- **Password**: `lyra2024`
- **Role**: AUDITOR
- **Department**: Compliance & Audit
- **Permissions**: `audit:read`

**Expected Access**:
- ✅ Full audit log access
- ❌ Cannot access follow bonus queue
- ❌ Cannot access user management
- ❌ Cannot access events
- ❌ Cannot perform any write operations

### 5. Phoenix Support (VIEWER)
- **Email**: `phoenix.ops@rsc-chain.com`
- **Password**: `phoenix2024`
- **Role**: VIEWER
- **Department**: Technical Support
- **Permissions**: `users:read`, `follow_bonus:read`, `events:read`, `audit:read`

**Expected Access**:
- ✅ Read-only access to all modules
- ✅ Can view follow bonus queue and stats
- ✅ Can view user information
- ✅ Can view events
- ✅ Can view audit logs
- ❌ Cannot approve/reject requests
- ❌ Cannot perform bulk operations
- ❌ Cannot modify any data

## 🧪 Testing Scenarios

### Permission Validation Tests

1. **Login Test**
   ```bash
   # Test login for each account
   curl -X POST http://localhost:4000/auth/admin/login \
     -H "Content-Type: application/json" \
     -d '{"email":"orion.ops@rsc-chain.com","password":"admin123"}'
   ```

2. **GraphQL Permission Tests**
   ```graphql
   # Test with different accounts - should work for all except AUDITOR
   query {
     followBonusQueue {
       requests { id status }
     }
   }

   # Test approval - should work for SUPER_ADMIN, OPS_LEAD, ANALYST only
   mutation {
     approveFollowBonusRequest(requestId: "test-id", notes: "Test") {
       id status
     }
   }
   ```

3. **Bulk Operations Test**
   ```graphql
   # Should work for SUPER_ADMIN, OPS_LEAD only
   mutation {
     bulkFollowBonusAction(
       requestIds: ["id1", "id2"]
       action: "approve"
       notes: "Bulk test"
     ) {
       successful
       failed
     }
   }
   ```

### Frontend Permission Tests

1. **UI Element Visibility**
   - Login with each account and verify which buttons/actions are visible
   - AUDITOR should only see audit-related sections
   - VIEWER should see read-only interfaces

2. **Action Availability**
   - Try to approve requests with VIEWER account (should fail)
   - Try bulk operations with ANALYST account (should fail)
   - Verify error messages are appropriate

## 🔍 Common Issues & Troubleshooting

### Permission Denied Errors
- Check that the account has the required permissions
- Verify the JWT token contains correct role information
- Check GraphQL resolver guards are applied correctly

### Login Failures
- Ensure database is seeded: `pnpm run db:seed`
- Check password hashing is consistent
- Verify account is active in database

### UI Not Updating
- Clear browser cache and cookies
- Check NextAuth session is updating correctly
- Verify GraphQL queries are using correct auth headers

## 📊 Permission Matrix

| Feature | SUPER_ADMIN | OPS_LEAD | ANALYST | AUDITOR | VIEWER |
|---------|-------------|----------|---------|---------|--------|
| View Dashboard | ✅ | ✅ | ✅ | ❌ | ✅ |
| View Follow Bonus Queue | ✅ | ✅ | ✅ | ❌ | ✅ |
| Approve/Reject Requests | ✅ | ✅ | ✅ | ❌ | ❌ |
| Bulk Operations | ✅ | ✅ | ❌ | ❌ | ❌ |
| View Users | ✅ | ✅ | ✅ | ❌ | ✅ |
| Manage Users | ✅ | ✅ | ❌ | ❌ | ❌ |
| View Events | ✅ | ✅ | ✅ | ❌ | ✅ |
| Manage Events | ✅ | ✅ | ❌ | ❌ | ❌ |
| View Audit Logs | ✅ | ✅ | ✅ | ✅ | ✅ |
| System Admin | ✅ | ❌ | ❌ | ❌ | ❌ |

## 🚀 Quick Test Commands

```bash
# Test all accounts login
for account in "orion.ops@rsc-chain.com:admin123" "nova.ops@rsc-chain.com:nova2024" "centauri.ops@rsc-chain.com:centauri2024" "lyra.ops@rsc-chain.com:lyra2024" "phoenix.ops@rsc-chain.com:phoenix2024"; do
  IFS=':' read -r email password <<< "$account"
  echo "Testing $email..."
  curl -X POST http://localhost:4000/auth/admin/login \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"$email\",\"password\":\"$password\"}" \
    -s | jq '.success'
done
```

## 📝 Development Notes

- Accounts are created during database seeding
- Passwords use bcrypt with 12 salt rounds
- Permissions are enforced at both GraphQL resolver and component levels
- Audit logging captures all permission checks and failures
- Frontend conditionally renders UI elements based on permissions

---

**Remember**: Each account represents a different user persona. Test thoroughly to ensure security boundaries are properly enforced!
