-- Opcional (Supabase proyecto admin): añade el permiso mining_ops a roles que deben ver el menú "Mining API".
-- super_admin ya tiene "all" en el panel y no necesita este paso.
-- Ejecutar una sola vez; evita duplicar el permiso.

UPDATE admin_roles
SET permissions = permissions || '["mining_ops"]'::jsonb
WHERE NOT (permissions @> '["mining_ops"]'::jsonb)
  AND name IN ('metrics_manager', 'user_manager', 'finance_manager');
