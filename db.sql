-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES TABLE
create table if not exists profiles (
  id uuid references auth.users on delete cascade not null primary key,
  name text,
  title text,
  bio text,
  image_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. SKILLS TABLE
create table if not exists skills (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  category text default 'General',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 3. PROJECTS TABLE
create table if not exists projects (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  image_url text,
  tags text[],
  link text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 4. CERTIFICATIONS TABLE
create table if not exists certifications (
 id uuid default uuid_generate_v4() primary key,
 title text not null,
 issuer text,
 date_issued text,
 description text,
 link text,
 image_url text,
 created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 5. BLOG POSTS TABLE
create table if not exists posts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  excerpt text,
  content text,
  category text,
  tags text[],
  image_url text,
  featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- ENABLE ROW LEVEL SECURITY
alter table profiles enable row level security;
alter table skills enable row level security;
alter table projects enable row level security;
alter table certifications enable row level security;
alter table posts enable row level security;

-- CREATE POLICIES

-- PROFILES
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- SKILLS
create policy "Skills are viewable by everyone."
  on skills for select
  using ( true );

create policy "Authenticated users can insert skills."
  on skills for insert
  with check ( auth.role() = 'authenticated' );

create policy "Authenticated users can update skills."
  on skills for update
  using ( auth.role() = 'authenticated' );

create policy "Authenticated users can delete skills."
  on skills for delete
  using ( auth.role() = 'authenticated' );

-- PROJECTS
create policy "Projects are viewable by everyone."
  on projects for select
  using ( true );

create policy "Authenticated users can insert projects."
  on projects for insert
  with check ( auth.role() = 'authenticated' );

create policy "Authenticated users can update projects."
  on projects for update
  using ( auth.role() = 'authenticated' );

create policy "Authenticated users can delete projects."
  on projects for delete
  using ( auth.role() = 'authenticated' );

-- CERTIFICATIONS
create policy "Certifications are viewable by everyone."
  on certifications for select
  using ( true );

create policy "Authenticated users can insert certifications."
  on certifications for insert
  with check ( auth.role() = 'authenticated' );

create policy "Authenticated users can update certifications."
  on certifications for update
  using ( auth.role() = 'authenticated' );

create policy "Authenticated users can delete certifications."
  on certifications for delete
  using ( auth.role() = 'authenticated' );

-- POSTS
create policy "Posts are viewable by everyone."
  on posts for select
  using ( true );

create policy "Authenticated users can insert posts."
  on posts for insert
  with check ( auth.role() = 'authenticated' );

create policy "Authenticated users can update posts."
  on posts for update
  using ( auth.role() = 'authenticated' );

create policy "Authenticated users can delete posts."
  on posts for delete
  using ( auth.role() = 'authenticated' );

-- OPTIONAL: STORAGE BUCKET POLICIES (If you use Supabase Storage)
-- You need to create a bucket named 'portfolio-images' in the dashboard first.
-- These policies assume the bucket exists.

-- insert into storage.buckets (id, name, public) values ('portfolio-images', 'portfolio-images', true);

-- create policy "Public Access"
--   on storage.objects for select
--   using ( bucket_id = 'portfolio-images' );

-- create policy "Authenticated users can upload"
--   on storage.objects for insert
--   with check ( bucket_id = 'portfolio-images' and auth.role() = 'authenticated' );
