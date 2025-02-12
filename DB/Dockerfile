# Use the official SQL Server image
FROM mcr.microsoft.com/mssql/server:latest

# Set environment variables
ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=P@ssw0rd!
ENV MSSQL_PID=Developer

# Copy initialization script
COPY init.sql /docker-entrypoint-initdb.d/

# Expose SQL Server port
EXPOSE 1433

# Copy the entrypoint script and make it executable
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh


# Start SQL Server and run the entrypoint script
CMD ["/usr/local/bin/docker-entrypoint.sh"]
