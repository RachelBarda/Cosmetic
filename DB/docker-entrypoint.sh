#!/bin/bash
set -e

# Start SQL Server in the background
/opt/mssql/bin/sqlservr &

echo "⏳ Waiting for SQL Server to start..."
until /opt/mssql-tools18/bin/sqlcmd -C -S localhost -U sa -P "P@ssw0rd!" -Q "SELECT 1" &>/dev/null; do
    sleep 30
done

echo "✅ SQL Server is ready! Running init.sql..."
/opt/mssql-tools18/bin/sqlcmd -C -S localhost -U sa -P "P@ssw0rd!" -i /docker-entrypoint-initdb.d/init.sql

echo "✅ Initialization complete!"

# Keep container running
wait

