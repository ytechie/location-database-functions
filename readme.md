Azure Functions for interacting with a SQL database that can track location of a device/asset.

## Examples

Inserting Data: `curl 'http://localhost:7071/api/RecordLocation?lat=2&long=4'`

## Database

This function assume a SQL Server database with the following table structure:

    CREATE TABLE [dbo].[Location](
        [Timestamp] [datetime2](7) NOT NULL,
        [Lat] [float] NOT NULL,
        [Long] [float] NOT NULL,
        [Speed] [float] NULL,
        [Device] [int] NOT NULL)