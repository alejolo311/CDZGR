-- ─────────────────────────────────────────────────────────────────────────────
-- Inscripciones grupales – Caídos del Zarzo 2026
--
-- El líder del grupo paga la totalidad (N participantes × precio con descuento).
-- Los participantes individuales se agregan operativamente desde el panel admin.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS grupos (
  id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre_grupo      TEXT        NOT NULL,
  categoria         TEXT        NOT NULL CHECK (categoria IN ('gravel','paseo')),
  num_participantes INTEGER     NOT NULL CHECK (num_participantes >= 10),
  precio_unitario   INTEGER     NOT NULL,   -- precio con 10 % descuento por persona
  precio_total      INTEGER     NOT NULL,   -- num_participantes × precio_unitario
  estado_pago       TEXT        NOT NULL DEFAULT 'pendiente'
                                CHECK (estado_pago IN ('pendiente','completado','fallido')),
  -- Datos del líder
  lider_nombre      TEXT        NOT NULL,
  lider_apellido    TEXT        NOT NULL,
  lider_email       TEXT        NOT NULL,
  lider_telefono    TEXT        NOT NULL,
  lider_documento   TEXT,
  lider_ciudad      TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── RLS ───────────────────────────────────────────────────────────────────────

ALTER TABLE grupos ENABLE ROW LEVEL SECURITY;

-- Cualquier visitante puede registrar un grupo (formulario público)
CREATE POLICY "grupos_insert_public" ON grupos
  FOR INSERT WITH CHECK (true);

-- Solo administradores autenticados leen y editan grupos
CREATE POLICY "grupos_select_auth" ON grupos
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "grupos_update_auth" ON grupos
  FOR UPDATE TO authenticated USING (true);

-- ── Vincular participantes a su grupo ─────────────────────────────────────────

ALTER TABLE inscripciones
  ADD COLUMN IF NOT EXISTS grupo_id UUID REFERENCES grupos(id) ON DELETE SET NULL;
