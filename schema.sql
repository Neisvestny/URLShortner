CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE
    links (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
        user_id uuid NOT NULL,
        slug text NOT NULL UNIQUE,
        original_url text NOT NULL,
        created_at timestamptz DEFAULT now ()
    );

CREATE TABLE
    users (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
        username text NOT NULL UNIQUE,
        email text NOT NULL UNIQUE,
        password_hash text NOT NULL,
        created_at timestamptz DEFAULT now (),
        updated_at timestamptz DEFAULT now ()
    );

CREATE TABLE
    visits (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
        link_id uuid NOT NULL,
        visited_at timestamptz DEFAULT now (),
        ip text,
        region text,
        country text,
        browser text,
        browser_version text,
        os text
    );

CREATE INDEX idx_links_user_id ON links USING btree (user_id);

CREATE INDEX idx_visits_link_id ON visits USING btree (link_id);

CREATE INDEX idx_visits_visited_at ON visits USING btree (visited_at);

ALTER TABLE ONLY links ADD CONSTRAINT links_user_id_fkey FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;

ALTER TABLE ONLY visits ADD CONSTRAINT visits_link_id_fkey FOREIGN KEY (link_id) REFERENCES links (id) ON DELETE CASCADE;