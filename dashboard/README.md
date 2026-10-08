# Content OS dashboard

Local, dependency-free, read-only projection of the selected external workspace.

```text
node dashboard/src/server.mjs
```

Without an instance it renders `SETUP REQUIRED` and empty counts. After ONBOARD it renders the configured display name and real counts, including a valid all-zero workspace. It never loads templates or demo fixtures as live data and accepts only `GET` and `HEAD`.
