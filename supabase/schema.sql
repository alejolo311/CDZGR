-- ============================================================
-- Caídos del Zarzo 2026 — Schema Supabase
-- Ejecutar en: https://supabase.com/dashboard → SQL Editor
-- ============================================================

CREATE TABLE IF NOT EXISTS inscripciones (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at   TIMESTAMPTZ NOT NULL    DEFAULT now(),

  -- Categoría
  categoria    TEXT        NOT NULL CHECK (categoria IN ('gravel', 'paseo')),
  subcategoria TEXT,                            -- Solo Gravel Race
  talla        TEXT        NOT NULL,

  -- Datos personales
  nombre       TEXT        NOT NULL,
  apellido     TEXT        NOT NULL,
  documento    TEXT        NOT NULL,
  nacimiento   DATE        NOT NULL,
  genero       TEXT        NOT NULL,
  ciudad       TEXT        NOT NULL,
  email        TEXT        NOT NULL,
  telefono     TEXT        NOT NULL,
  club         TEXT,

  -- Salud
  rh                  TEXT NOT NULL,
  eps                 TEXT NOT NULL,
  alergias            TEXT,
  medicamentos        TEXT,
  emergencia_nombre   TEXT NOT NULL,
  emergencia_tel      TEXT NOT NULL,
  emergencia_rel      TEXT NOT NULL,

  -- Pago
  precio_cop   INTEGER     NOT NULL,
  estado_pago  TEXT        NOT NULL DEFAULT 'completado'
                           CHECK (estado_pago IN ('completado', 'pendiente', 'fallido')),

  -- Asignado por el organizador después de verificar
  numero_participante TEXT UNIQUE
);

-- ── Índices útiles para administración ───────────────────────
CREATE INDEX IF NOT EXISTS idx_inscripciones_email     ON inscripciones (email);
CREATE INDEX IF NOT EXISTS idx_inscripciones_categoria ON inscripciones (categoria);
CREATE INDEX IF NOT EXISTS idx_inscripciones_created   ON inscripciones (created_at DESC);

-- ── Row Level Security ────────────────────────────────────────
ALTER TABLE inscripciones ENABLE ROW LEVEL SECURITY;

-- Cualquier visitante puede insertar (inscribirse)
CREATE POLICY "insert_publica" ON inscripciones
  FOR INSERT TO anon WITH CHECK (true);

-- Solo usuarios autenticados (admin) pueden leer
CREATE POLICY "select_admin" ON inscripciones
  FOR SELECT TO authenticated USING (true);

-- Solo usuarios autenticados pueden actualizar (ej: asignar número de participante)
CREATE POLICY "update_admin" ON inscripciones
  FOR UPDATE TO authenticated USING (true);
