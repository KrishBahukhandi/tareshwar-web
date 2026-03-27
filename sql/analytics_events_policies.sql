alter table public.analytics_events enable row level security;

create policy "analytics_insert_own_events"
on public.analytics_events
for insert
to authenticated
with check (
  user_id = auth.uid()
);

create policy "analytics_insert_anonymous_events"
on public.analytics_events
for insert
to anon
with check (
  user_id is null
);

create policy "analytics_insert_null_user_for_authenticated"
on public.analytics_events
for insert
to authenticated
with check (
  user_id is null or user_id = auth.uid()
);

create policy "analytics_select_own_events"
on public.analytics_events
for select
to authenticated
using (
  user_id = auth.uid()
);

create index if not exists analytics_events_event_type_idx
on public.analytics_events (event_type);

create index if not exists analytics_events_user_id_idx
on public.analytics_events (user_id);

create index if not exists analytics_events_timestamp_idx
on public.analytics_events ("timestamp");

create index if not exists analytics_events_event_data_gin_idx
on public.analytics_events
using gin (event_data);
