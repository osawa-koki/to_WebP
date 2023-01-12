FROM node:19-bullseye-slim AS web_client
WORKDIR /usr/src
COPY ./client ./client
RUN cd ./client && yarn install && yarn build

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ./server/server.csproj .
RUN dotnet restore ./server.csproj
COPY ./server .
RUN dotnet build ./server.csproj -c Release -o /app/build

FROM build AS publish
RUN dotnet publish server.csproj -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY --from=web_client /usr/src/client/dist ./wwwroot
ENTRYPOINT ["dotnet", "server.dll"]
